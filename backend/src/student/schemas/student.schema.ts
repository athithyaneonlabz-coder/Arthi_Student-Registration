import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StudentDocument = HydratedDocument<Student>;

export enum StudentStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive"
}

@Schema({ timestamps: true, versionKey: false })
export class Student {
  @Prop({ required: true, trim: true })
  firstName!: string;

  @Prop({ required: true, trim: true })
  lastName!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  email!: string;

  @Prop({ required: true, unique: true, trim: true, index: true })
  studentId!: string;

  @Prop({ required: true, type: Date })
  dateOfBirth!: Date;

  @Prop({ required: true, trim: true })
  department!: string;

  @Prop({ required: true, min: 1, max: 4 })
  year!: number;

  @Prop({
    required: true,
    enum: Object.values(StudentStatus),
    default: StudentStatus.ACTIVE
  })
  status!: StudentStatus;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.index({ email: 1 }, { unique: true });
StudentSchema.index({ studentId: 1 }, { unique: true });