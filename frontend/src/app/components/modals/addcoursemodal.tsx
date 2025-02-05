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

const AddCourseModal = ({ setAddNewOpen }) => {
  const [course, setCourse] = useState({
    name: "",
    code: "",
    school: "",
  });
  const [failed, setFailed] = useState(false);
  const { toast } = useToast();

  const addClicked = async () => {
    try {
      console.log("Adding course", course.name);

      const response = await axios.post(
        "http://localhost:5000/api/courses/addcourse",
        { course }
      );

      console.log(response);

      toast({
        variant: "destructive",
        title: response.data.message || "Kurssi lisätty onnistuneesti!",
        description: "Kiitos :)",
      });

      setAddNewOpen(false);
    } catch (error) {
      console.error("Error adding course:", error);

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 505) {
          setFailed(true);
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
          <CardTitle>Lisää kurssi</CardTitle>
          <CardDescription>
            Etkö löytänyt etsimääsi kurssia? Lisää se tästä!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Kurssin nimi</Label>
              <Input id="name" placeholder="Syötä nimi" onChange={updateName} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Kurssin koodi</Label>
              <Input
                id="code"
                placeholder="Syötä koodi"
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
            Virhe kurssin lisäämisessä. Tarkistithan että sitä ei ole vielä
            lisätty?
          </p>
        )}
        <CardFooter className="flex justify-between">
          <Button variant="reverse" onClick={() => setAddNewOpen(false)}>
            Eiku
          </Button>
          <Button onClick={addClicked}>Lisää kurssi</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCourseModal;
