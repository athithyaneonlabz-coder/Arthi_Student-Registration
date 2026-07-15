import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentController } from "./student.controller";
import { MongoStudentRepository } from "./student.repository";
import { StudentService } from "./student.service";
import { Student, StudentSchema } from "./schemas/student.schema";
import { StudentRepository } from "./interfaces/student.interface";

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
  controllers: [StudentController],
  providers: [
    StudentService,
    MongoStudentRepository,
    {
      provide: StudentRepository,
      useExisting: MongoStudentRepository
    }
  ],
  exports: [StudentService, StudentRepository]
})
export class StudentModule {}
