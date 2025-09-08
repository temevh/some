import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { ChangeEvent, useState } from "react";
import Rating from "@mui/material/Rating";
import { Textarea } from "@/app/components/ui/textarea";
import { useTranslation } from "react-i18next";

interface AddRatingProps {
  setAddRatingShow: (show: boolean) => void;
  course: { name: string };
  sendRatingClicked: (
    ratings: {
      rating: number;
      teaching: number;
      difficulty: number;
      workload: number;
    },
    comment: string
  ) => void;
  errorMessage: string;
}

const AddRating = ({
  setAddRatingShow,
  course,
  sendRatingClicked,
  errorMessage,
}: AddRatingProps) => {
  const { t } = useTranslation();
  const [ratings, setRatings] = useState({
    rating: 0,
    teaching: 0,
    difficulty: 0,
    workload: 0,
  });
  const [comment, setComment] = useState("");

  const handleRatingChange = (key: string, value: number | null) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-[350px] bg-white">
        <CardHeader>
          <CardTitle>
            {" "}
            {t("add-rating-header")}
            {course.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row justify-between items-center">
                <Label htmlFor="rating">{t("overall-label")} *</Label>
                <Rating
                  name="rating"
                  value={ratings.rating}
                  onChange={(_, newValue) =>
                    handleRatingChange("rating", newValue)
                  }
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <Label htmlFor="teaching">{t("teaching-label")} *</Label>
                <Rating
                  name="teaching"
                  value={ratings.teaching}
                  onChange={(_, newValue) =>
                    handleRatingChange("teaching", newValue)
                  }
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <Label htmlFor="difficulty">{t("difficulty-label")} *</Label>
                <Rating
                  name="difficulty"
                  value={ratings.difficulty}
                  onChange={(_, newValue) =>
                    handleRatingChange("difficulty", newValue)
                  }
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <Label htmlFor="workload">{t("workload-label")} *</Label>
                <Rating
                  name="workload"
                  value={ratings.workload}
                  onChange={(_, newValue) =>
                    handleRatingChange("workload", newValue)
                  }
                />
              </div>
              <div className="pt-4">
                <Label htmlFor="workload">{t("free-word")}</Label>
                <Textarea onChange={(e) => handleCommentChange(e)} />
              </div>
            </div>
          </div>
          {errorMessage !== "" && (
            <p className="text-red-500">{errorMessage}</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="reverse" onClick={() => setAddRatingShow(false)}>
            {t("cancel-button")}
          </Button>
          <Button onClick={() => sendRatingClicked(ratings, comment)}>
            {t("save-button")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddRating;
