import { useState, useEffect, ReactNode } from "react";
import { Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { receiveUserById } from "../../../store/photographerSlice";
import ErrorPage from "../../errorPage/error-page";
import Loader from "../../../components/ui/Loader";
import AboutPhotographer from "./about-photographer";
import Experience from "./experience";
import "./index.css";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ flex: 7 }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ProfilePhotographerPage() {
  const dispatch = useDispatch<AppDispatch>();
  const photographerProfileInfo = useSelector(
    (state: any) => state.photographer.photographerProfileInfo
  );
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(receiveUserById(id)).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!Object.hasOwn(photographerProfileInfo, "surname")) {
    return <ErrorPage />;
  }

  return (
    <div className="profile-wrapper">
      <div className="aside">
        <div className="aside-container shadow-container">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleTabChange}
            aria-label="Vertical tabs"
            sx={{
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <Tab
              sx={{ alignItems: "flex-end" }}
              label="О фотографе"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ alignItems: "flex-end" }}
              label="Опыт"
              {...a11yProps(1)}
            />
          </Tabs>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <AboutPhotographer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Experience />
      </TabPanel>
    </div>
  );
}
