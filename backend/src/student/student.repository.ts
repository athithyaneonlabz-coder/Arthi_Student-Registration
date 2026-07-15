import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { StudentRepository, Student, StudentEntity } from "./interfaces/student.interface";
import { Student as StudentModel, StudentDocument } from "./schemas/student.schema";

@Injectable()
export class MongoStudentRepository extends StudentRepository {
  constructor(
    @InjectModel(StudentModel.name)
    private readonly studentModel: Model<StudentDocument>
  ) {
    super();
  }

  async createStudent(student: Student): Promise<StudentEntity> {
    return this.studentModel.create({
      ...student,
      email: student.email.toLowerCase()
    });
  }

  async findAll(): Promise<StudentEntity[]> {
    return this.studentModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<StudentEntity | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return this.studentModel.findById(id).exec();
  }

  async updateStudent(id: string, student: Partial<Student>): Promise<StudentEntity | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid student id.");
    }

    return this.studentModel
      .findByIdAndUpdate(
        id,
        {
          ...student,
          ...(student.email ? { email: student.email.toLowerCase() } : {})
        },
        {
          new: true,
          runValidators: true
        }
      )
      .exec();
  }

  async deleteStudent(id: string): Promise<StudentEntity | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid student id.");
    }

    return this.studentModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<StudentEntity | null> {
    return this.studentModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findByStudentId(studentId: string): Promise<StudentEntity | null> {
    return this.studentModel.findOne({ studentId }).exec();
  }
}
