"use client";
import { useEffect, useState } from "react";
import { SchoolDropdown } from "./components/filters";
import { Coursetable } from "./components";
import { Input } from "./components/ui";
import { FindCourseButton, AddCourseButton } from "./components/buttons";
import { AddCourseModal } from "./components/modals";
import { useMobile } from "@/context/mobilecontext";
import { Search } from "./components/inputs";
import { useTranslation } from "react-i18next";

import { getInitialCourses, getFilteredCourses } from "@/lib/api";

export default function Home() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [courses, setCourses] = useState<
    { id: string; code: string; name: string; school: string }[]
  >([]);
  const [school, setSchool] = useState<string | null>(null);
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getInitialCourses();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getFilteredCourses(school, searchTerm);
    setCourses(data);
  };

  const addCourseClicked = () => {
    setAddNewOpen(!addNewOpen);
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col gap-4 relative p-2">
        {addNewOpen && <AddCourseModal setAddNewOpen={setAddNewOpen} />}
        <div className="flex flex-row gap-4">
          <Input type="text" placeholder="Kurssin nimi tai koodi" />
          <SchoolDropdown selectedSchool={school} setSchool={setSchool} />
        </div>
        <div className="flex flex-row justify-between">
          <FindCourseButton fetchCourses={fetchCourses} />
          <AddCourseButton addCourseClicked={addCourseClicked} />
        </div>
        {courses.length ? (
          <Coursetable courses={courses} />
        ) : (
          <p>{t("courses-not-found")}</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {addNewOpen && <AddCourseModal setAddNewOpen={setAddNewOpen} />}
      <div className="flex flex-row gap-4">
        <SchoolDropdown selectedSchool={school} setSchool={setSchool} />
        <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <AddCourseButton addCourseClicked={addCourseClicked} />
      </div>
      <FindCourseButton fetchCourses={fetchCourses} />
      {courses.length ? (
        <Coursetable courses={courses} />
      ) : (
        <p>{t("courses-not-found")}</p>
      )}
    </div>
  );
}
