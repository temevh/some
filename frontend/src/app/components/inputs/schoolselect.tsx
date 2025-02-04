import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { schools } from "@/assets/data";

const SchoolSelect = ({
  updateSchool,
}: {
  updateSchool: (value: string) => void;
}) => {
  return (
    <Select onValueChange={updateSchool}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Valitse oppilaitos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {schools.map((school) => {
            return (
              <SelectItem value={school} key={school}>
                {school}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SchoolSelect;
