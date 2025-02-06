import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { Textarea } from "@/app/components/ui/textarea";

const AddRating = ({ setAddRatingShow, course }) => {
  const [ratings, setRatings] = useState({
    rating: 0,
    teaching: 0,
    difficulty: 0,
    workload: 0,
  });

  const handleRatingChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-[350px] bg-white">
        <CardHeader>
          <CardTitle>Lisää arvostelu kurssille {course.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row justify-between items-center">
                <Label htmlFor="rating">Kokonaisarvosana</Label>
                <Rating
                  name="rating"
                  value={ratings.rating}
                  onChange={(event, newValue) =>
                    handleRatingChange("rating", newValue)
                  }
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <Label htmlFor="teaching">Opetus</Label>
                <Rating
                  name="teaching"
                  value={ratings.teaching}
                  onChange={(event, newValue) =>
                    handleRatingChange("teaching", newValue)
                  }
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <Label htmlFor="difficulty">Vaikeus</Label>
                <Rating
                  name="difficulty"
                  value={ratings.difficulty}
                  onChange={(event, newValue) =>
                    handleRatingChange("difficulty", newValue)
                  }
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <Label htmlFor="workload">Työmäärä</Label>
                <Rating
                  name="workload"
                  value={ratings.workload}
                  onChange={(event, newValue) =>
                    handleRatingChange("workload", newValue)
                  }
                />
              </div>
              <div className="pt-4">
                <Label htmlFor="workload">Vapaa sana kurssista</Label>
                <Textarea />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="reverse" onClick={() => setAddRatingShow(false)}>
            Eiku
          </Button>
          <Button onClick={() => console.log("Submitted ratings:", ratings)}>
            Tallenna
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddRating;
