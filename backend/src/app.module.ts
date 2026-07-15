import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentModule } from "./student/student.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/student-registration"),
    StudentModule
  ]
})
export class AppModule {}