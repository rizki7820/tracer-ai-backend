<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // Admin
    case ManageUsers = 'manage-users';
    case ManageCompany = 'manage-company';
    case ManageJobs = 'manage-jobs';
    case ManageDashboard = 'manage-dashboard';

    // Company
    case CreateJob = 'create-job';
    case UpdateJob = 'update-job';
    case DeleteJob = 'delete-job';
    case ViewApplicant = 'view-applicant';

    // Alumni
    case ApplyJob = 'apply-job';
    case UploadResume = 'upload-resume';
    case UpdateProfile = 'update-profile';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
