import { useState } from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SchoolSelect } from "../inputs";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { addCourse } from "@/lib/api";
import { useTranslation } from "react-i18next";
import { Course } from "@/app/courses/[code]/interfaces";

interface AddCourseModalProps {
  setAddNewOpen: (open: boolean) => void;
}

const AddCourseModal = ({ setAddNewOpen }: AddCourseModalProps) => {
  const [course, setCourse] = useState({
    name: "",
    code: "",
    school: "",
  });
  const [failed, setFailed] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const addClicked = async () => {
    if (!course?.name || !course?.code || !course?.school) {
      toast({
        variant: "destructive",
        title: t("toast-add-error-title"),
        description: t("toast-add-error-description"),
      });
      return;
    }

    try {
      const response = await addCourse(course);

      console.log("Response:", response);

      toast({
        variant: "success",
        title: response.message || (t("toast-add-success-title") as string),
        description: t("toast-add-success-description"),
      });

      setAddNewOpen(false);
    } catch (error) {
      console.error("Error adding course:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 409) {
            toast({
              variant: "destructive",
              title: t("toast-add-error-title"),
              description:
                (error.response.data.message as string) ||
                (t("toast-add-error-description") as string),
            });
          } else if (error.response.status === 500) {
            setFailed(true);
            toast({
              variant: "destructive",
              title: t("toast-add-unknown-title"),
              description:
                (error.response.data.message as string) ||
                (t("toast-add-unknown-description") as string),
            });
          }
        }
      }
    }
  };

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setCourse((prev) => ({ ...prev, name: newName }));
  };

  const updateCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    setCourse((prev) => ({ ...prev, code: newCode }));
  };

  const updateSchool = (school: string) => {
    setCourse((prev) => ({ ...prev, school: school }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t("add-course-title")}</CardTitle>
          <CardDescription>{t("add-course-description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{t("course-name")}</Label>
              <Input
                id="name"
                placeholder={t("course-name-placeholder") as string}
                onChange={updateName}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{t("course-code")}</Label>
              <Input
                id="code"
                placeholder={t("course-code-placeholder") as string}
                onChange={updateCode}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <SchoolSelect updateSchool={updateSchool} />
            </div>
          </div>
        </CardContent>
        {failed && (
          <p className="text-center text-red-600 p-2">
            {t("toast-add-error-title")} {t("toast-add-error-description")}
          </p>
        )}
        <CardFooter className="flex justify-between">
          <Button variant="reverse" onClick={() => setAddNewOpen(false)}>
            {t("add-course-cancel")}
          </Button>
          <Button onClick={addClicked}>{t("add-course-submit")}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCourseModal;
