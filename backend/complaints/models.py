from xml.parsers.expat import errors

from django.db import models
from django.utils import timezone
from accounts.models import User
from categories.models import ComplaintCategory
from common.models import BaseModel
from departments.models import Department, DepartmentOffice
from locations.models import District, State
from django.core.exceptions import ValidationError
from .choices import ComplaintPriority


class ComplaintStatus(BaseModel):
    name = models.CharField(
        max_length=100,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    order = models.PositiveIntegerField(
        unique=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Complaint Status"
        verbose_name_plural = "Complaint Statuses"

    def __str__(self):
        return self.name


class Complaint(BaseModel):
    reference_number = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="complaints",
    )

    category = models.ForeignKey(
        ComplaintCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="complaints",
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="complaints",
    )

    department_office = models.ForeignKey(
        DepartmentOffice,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="complaints",
    )

    state = models.ForeignKey(
        State,
        on_delete=models.PROTECT,
        related_name="complaints",
    )

    district = models.ForeignKey(
        District,
        on_delete=models.PROTECT,
        related_name="complaints",
    )

    status = models.ForeignKey(
        ComplaintStatus,
        on_delete=models.PROTECT,
        related_name="complaints",
    )

    priority = models.CharField(
        max_length=10,
        choices=ComplaintPriority.choices,
        default=ComplaintPriority.MEDIUM,
    )

    title = models.CharField(
        max_length=200,
    )

    description = models.TextField()

    address = models.TextField()

    landmark = models.CharField(
        max_length=200,
        blank=True,
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
    )

    ai_summary = models.TextField(
        blank=True,
    )

    ai_confidence = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        null=True,
        blank=True,
    )

    is_ai_processed = models.BooleanField(
        default=False,
    )

    is_anonymous = models.BooleanField(
        default=False,
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Complaint"
        verbose_name_plural = "Complaints"

    def save(self, *args, **kwargs):
        if not self.reference_number:
            year = timezone.now().year

        last_complaint = (
            Complaint.objects
            .filter(reference_number__startswith=f"CMP-{year}")
            .order_by("-id")
            .first()
        )

        if last_complaint:
            last_number = int(
                last_complaint.reference_number.split("-")[-1]
            )
            new_number = last_number + 1
        else:
            new_number = 1

        self.reference_number = (
            f"GC-{year}-{new_number:06d}"
        )

        super().save(*args, **kwargs)
    
    def clean(self):
        errors = {}

    # Validate District belongs to State
        if self.district and self.state:
            if self.district.state != self.state:
                errors["district"] = (
                    "Selected district does not belong to the selected state."
                )

        # Validate Office belongs to Department
        if self.department and self.department_office:
            if self.department_office.department != self.department:
                errors["department_office"] = (
                    "Selected office does not belong to the selected department."
                )

     # Validate Office belongs to District
        if self.department_office and self.district:
            if self.department_office.district != self.district:
                errors["department_office"] = (
                    "Selected office does not belong to the selected district."
                )

        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return f"{self.reference_number} - {self.title}"


class ComplaintImage(BaseModel):
    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image = models.ImageField(
        upload_to="complaints/",
    )

    class Meta:
        ordering = ["created_at"]
        verbose_name = "Complaint Image"
        verbose_name_plural = "Complaint Images"

    def __str__(self):
        return self.complaint.reference_number


class ComplaintStatusHistory(BaseModel):
    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="status_history",
    )

    old_status = models.ForeignKey(
        ComplaintStatus,
        on_delete=models.PROTECT,
        related_name="old_status_history",
        null=True,
        blank=True,
    )

    new_status = models.ForeignKey(
        ComplaintStatus,
        on_delete=models.PROTECT,
        related_name="new_status_history",
    )

    remarks = models.TextField(
        blank=True,
    )

    class Meta:
        ordering = ["created_at"]
        verbose_name = "Complaint Status History"
        verbose_name_plural = "Complaint Status Histories"

    def __str__(self):
        return (
            f"{self.complaint.reference_number} → "
            f"{self.new_status.name}"
        )