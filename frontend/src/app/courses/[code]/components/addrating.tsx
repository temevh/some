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
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

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
    comment?: string,
    fakeout?: string,
    recaptchaToken?: string
  ) => void | Promise<void>;
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
  const [fakeout, setFakeout] = useState("");

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleRatingChange = (key: string, value: number | null) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg border border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl border-b">
          <CardTitle className="text-blue-900">
            {t("add-rating-header")} {course.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-3">
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
              <div className="pt-2">
                <Label htmlFor="workload">{t("free-word")}</Label>
                <Textarea
                  onChange={(e) => handleCommentChange(e)}
                  placeholder={t("free-word") || ""}
                />
              </div>
              <input
                style={{ display: "none" }}
                type="text"
                onChange={(e) => setFakeout(e.target.value)}
              ></input>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={setRecaptchaToken}
                className="mt-2"
              ></ReCAPTCHA>
            </div>
          </div>
          {errorMessage !== "" && (
            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button variant="reverse" onClick={() => setAddRatingShow(false)}>
            {t("cancel-button")}
          </Button>
          <Button
            onClick={() =>
              sendRatingClicked(
                ratings,
                comment,
                fakeout,
                recaptchaToken === null ? undefined : recaptchaToken
              )
            }
            disabled={!recaptchaToken}
          >
            {t("save-button")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddRating;
