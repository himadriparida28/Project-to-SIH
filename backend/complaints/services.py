from .models import Complaint, ComplaintImage

class ComplaintService:

    @staticmethod
    def create_complaint(*, user, validated_data):
        complaint = Complaint.objects.create(
            user=user,
            **validated_data,
        )

        return complaint
    @staticmethod
    def upload_images(*, complaint, images):
        complaint_images = []

        for image in images:
            complaint_images.append(
                ComplaintImage(
                    complaint=complaint,
                    image=image,
                )
            )

        ComplaintImage.objects.bulk_create(
            complaint_images
        )
    @staticmethod
    def update_complaint(
        *,
        complaint,
        validated_data,
    ):
        for field, value in validated_data.items():
            setattr(
                complaint,
                field,
                value,
            )

        complaint.save()

        return complaint
    @staticmethod
    def delete_complaint(complaint,):
        complaint.is_deleted = True
        complaint.save(
            update_fields=["is_deleted"]
        )
    @staticmethod
    def mark_ai_processed(
        complaint,
        *,
        category,
        department,
        office,
        priority,
        summary,
        confidence,
    ):
        complaint.category = category
        complaint.department = department
        complaint.department_office = office
        complaint.priority = priority
        complaint.ai_summary = summary
        complaint.ai_confidence = confidence
        complaint.is_ai_processed = True

        complaint.save()