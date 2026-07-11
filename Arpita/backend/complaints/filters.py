import django_filters

from .models import Complaint


class ComplaintFilter(django_filters.FilterSet):

    class Meta:
        model = Complaint

        fields = (
            "status",
            "priority",
            "category",
            "department",
            "district",
            "state",
        )