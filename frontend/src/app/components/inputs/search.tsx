import { FC } from "react";
import { Input } from "../ui";
import { useTranslation } from "react-i18next";

interface SearchProps {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
}

const Search: FC<SearchProps> = ({ setSearchTerm, searchTerm }) => {
  const { t } = useTranslation();
  return (
    <Input
      type="text"
      placeholder={t("search-placeholder")}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
};

export default Search;
