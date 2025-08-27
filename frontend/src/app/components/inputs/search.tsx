import { FC } from "react";
import { Input } from "../ui";

interface SearchProps {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
}

const Search: FC<SearchProps> = ({ setSearchTerm, searchTerm }) => {
  return (
    <Input
      type="text"
      placeholder="Kurssi"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
};

export default Search;
