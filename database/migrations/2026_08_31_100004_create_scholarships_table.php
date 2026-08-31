<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scholarships', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('provider'); // penyelenggara: LPDP, Djarum, Kampus, dll
            $table->string('logo')->nullable();
            $table->string('level')->nullable(); // S1, S2, S3
            $table->string('field')->nullable(); // bidang studi
            $table->string('location')->nullable(); // dalam negeri / luar negeri / kota
            $table->string('funding_type')->nullable(); // penuh / parsial
            $table->text('description')->nullable();
            $table->json('requirements')->nullable();
            $table->json('benefits')->nullable();
            $table->string('registration_url')->nullable();
            $table->date('deadline')->nullable();
            $table->enum('status', ['draft', 'published', 'closed'])->default('published');
            $table->string('source')->default('manual');
            $table->string('source_external_id')->nullable()->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scholarships');
    }
};
