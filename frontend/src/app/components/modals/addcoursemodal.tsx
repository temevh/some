import * as React from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddCourseModal = () => {
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
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nimi</Label>
                <Input id="name" placeholder="Kurssin nimi" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Oppilaitos</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Valitse" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">TUNI</SelectItem>
                    <SelectItem value="sveltekit">LUT</SelectItem>
                    <SelectItem value="astro">JYU</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Eiku</Button>
          <Button>Lisää kurssi</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCourseModal;
