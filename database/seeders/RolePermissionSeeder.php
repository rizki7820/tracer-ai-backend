<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use App\Enums\RoleEnum;
use App\Enums\PermissionEnum;


class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (RoleEnum::cases() as $role) {

            Role::firstOrCreate([
                'name' => $role->value
            ]);
        }

        foreach (PermissionEnum::cases() as $permission) {

            Permission::firstOrCreate([
                'name' => $permission->value
            ]);
        }

        $admin = Role::findByName(RoleEnum::Admin->value);

        $admin->givePermissionTo([

            PermissionEnum::ManageUsers->value,

            PermissionEnum::ManageCompany->value,

            PermissionEnum::ManageJobs->value,

            PermissionEnum::ManageDashboard->value,

        ]);

        $company = Role::findByName(RoleEnum::Company->value);

        $company->givePermissionTo([

            PermissionEnum::CreateJob->value,

            PermissionEnum::UpdateJob->value,

            PermissionEnum::DeleteJob->value,

            PermissionEnum::ViewApplicant->value,

        ]);

        $alumni = Role::findByName(RoleEnum::Alumni->value);

        $alumni->givePermissionTo([

            PermissionEnum::ApplyJob->value,

            PermissionEnum::UploadResume->value,

            PermissionEnum::UpdateProfile->value,

        ]);
    }
}
