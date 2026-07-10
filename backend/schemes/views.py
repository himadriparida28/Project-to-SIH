from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .services import GovernmentSchemeService

from .models import GovernmentScheme
from .serializers import GovernmentSchemeListSerializer, GovernmentSchemeDetailSerializer


class GovernmentSchemeListView(ListAPIView):
    serializer_class = GovernmentSchemeListSerializer
    permission_classes = [AllowAny]

    queryset = GovernmentScheme.objects.filter(
        is_deleted=False,
        is_active=True,
    )

    filterset_fields = (
        "category",
        "department",
        "state",
    )

    search_fields = (
        "scheme_name",
        "scheme_code",
        "keywords",
    )

    ordering_fields = (
        "scheme_name",
        "created_at",
    )

    ordering = (
        "scheme_name",
    )

class GovernmentSchemeDetailView(RetrieveAPIView):
    serializer_class = GovernmentSchemeDetailSerializer
    permission_classes = [AllowAny]

    lookup_field = "pk"

    def get_object(self):
        return GovernmentSchemeService.get_scheme_by_id(
            self.kwargs["pk"]
        )