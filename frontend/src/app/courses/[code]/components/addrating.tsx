import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

const AddRating = ({ setAddRating }) => {
  const [course, setCourse] = useState({
    name: "",
    code: "",
    school: "",
  });
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
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="reverse" onClick={() => setAddRating(false)}>
            Eiku
          </Button>
          <Button>Lisää kurssi</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddRating;
