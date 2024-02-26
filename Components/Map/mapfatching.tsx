import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import DeleteIcon from '@mui/icons-material/Delete';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useQuery } from "react-query";
import {
  FindPharmacyInterface,
  PharmacyListsInterface,
} from "../../datainterface";
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { pharmacyId } from "../../api/Functions/functions";
import { Icon } from "leaflet";

import { useRouter } from "next/router";
import { patientDetails } from "../../api/Functions/functions";
import { Medicine, PatientDetails } from "../../datainterface";
import { Bounds, MapEventsProps } from "../../datainterface";
import LanguageIcon from "@mui/icons-material/Language";

const MapFatch: React.FC<MapEventsProps> = ({ updateBounds }) => {
  useMapEvents({
    moveend: () => {
      updateBounds();
    },
    click: () => {
      updateBounds();
    },
  });

  return null;
};

const mapfatching: React.FC = () => {
  const router = useRouter();
  const { slug } = router?.query;
  const [open, setOpen] = React.useState(false);
  const [contentId, setContentId] = React.useState(-1)
  // const [map, setMap]=React.useState(-1)




  const handleClickOpen = (contentIdValue?: number) => {
    if (!!contentIdValue || contentIdValue === 0) {
      console.log("test handleClickOpen", contentIdValue)
      setContentId(contentIdValue)
    }

    setOpen(true);
  };

  const handleClose = () => {
    setContentId(-1)
    setOpen(false);
  };


  const initialBounds: Bounds = {
    south: 50.52756741275991,
    west: -1.3253418945312534,
    north: 52.46621385575,
    east: 1.5805418945312466,
  };
  const [bounds, setBounds] = React.useState<Bounds>(initialBounds);
  const [pharmacy, setPharmacy] = React.useState<FindPharmacyInterface>({
    length: 100,
    page: 1,
    dayOfWeek: "tuesday",
    timeNow: "16:32:26",
    mapBoundary: bounds,
  });
  const [mapData, setMapData] = React.useState()

  const mapHandle = (mapContentValue: number) => {
    if (!!mapContentValue || mapContentValue === 0) {
      console.log(mapContentValue);

    }
  }

  const {
    data: fetchpharmacylists,
    isLoading: findpharmacyloading,
    isError: findpharmacyerror,
  } = useQuery({
    queryFn: () => pharmacyId(pharmacy),
    queryKey: ["FetchPharmacyLists", { bounds }],
  });
  const myIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535137.png",
    iconSize: [50, 50],
  });

  const MapEventsWrapper: React.FC = () => {
    const map = useMap();

    const updateBounds = () => {
      const newBounds = map.getBounds();
      setBounds({
        south: newBounds.getSouthWest().lat,
        west: newBounds.getSouthWest().lng,
        north: newBounds.getNorthEast().lat,
        east: newBounds.getNorthEast().lng,
      });

      setPharmacy((prevState) => ({
        ...prevState,
        mapBoundary: {
          south: newBounds.getSouthWest().lat,
          west: newBounds.getSouthWest().lng,
          north: newBounds.getNorthEast().lat,
          east: newBounds.getNorthEast().lng,
        },
      }));
    };

    return <MapFatch updateBounds={updateBounds} />;
  };

  const {
    data: patientdetails,
    isLoading: patientdetailsloading,
    isError: fetchpatientdetailserror,
  } = useQuery({
    queryKey: ["patientdetails", { slug }],
    queryFn: () => patientDetails(slug),
    enabled: !!slug,
  });



  React.useEffect(() => {
    setPharmacy({
      ...pharmacy,
      mapBoundary: bounds,
    });
  }, [fetchpharmacylists]);
  const [selectedItem, setSelectedItem] =
    React.useState<PharmacyListsInterface | null>(null);
  const handleItemClick = (item: PharmacyListsInterface) => {
    setSelectedItem(item);
  };

  const DialogContentData = React.useMemo(() => {

    if ((!!contentId || contentId === 0) && contentId !== -1 && !!fetchpharmacylists?.docs?.length) {

      return (
        <React.Fragment key={contentId}>
          <DialogTitle>{fetchpharmacylists?.docs[contentId].name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <img src={fetchpharmacylists?.docs?.[contentId]?.branch_logo
              } alt="" style={{ height: "30px", width: "30px", borderRadius: "50%" }} />
              <Typography>Email: {fetchpharmacylists?.docs?.[contentId]?.email}</Typography>
              <Typography>Phone: {fetchpharmacylists?.docs?.[contentId]?.phone}</Typography>
              <Typography>Address: {fetchpharmacylists?.docs?.[contentId]?.address}</Typography>
              <Typography>Status: {fetchpharmacylists?.docs?.[contentId]?.status}</Typography>
              {
                fetchpharmacylists?.docs[contentId]?.pharmacyBranchWorkingDay?.map((day: any) => {
                  return <>
                    <Typography>Day : {day.dayOfWeek} </Typography>
                    {
                      day?.pharmacyBranchWorkingHour?.map((hour: any) => {
                        return (
                          <Typography>Time: from {hour?.openAt}  to {hour?.closeAt}</Typography>
                        )
                      })
                    }

                  </>
                })
              }


            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </React.Fragment>

      )
    } else return null
  }, [contentId, fetchpharmacylists?.docs?.length])

  return (
    <>
      <>
        <Box>
          <Typography variant="h5" gutterBottom>
            <MedicalInformationIcon />
            Find Pharmacy
            <Link
              href={"/"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                color: "#60b6fb",
              }}
            >
              <ArrowBackIosIcon />
              Back
            </Link>
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper>
              <Box>
                <Card>
                  <Box>
                    <Typography
                      variant="body2"
                      gutterBottom
                      className="presciddesign"
                      style={{ fontFamily: "Times" }}
                    >
                      {slug}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={() => handleClickOpen()}
                    >
                      View
                    </Button>
                  </Box>
                </Card>
                <Box>
                  <TextField
                    type="text"
                    placeholder="Enter Postcode / City / Others"
                    style={{
                      width: "100%",
                      border: "none",
                      boxShadow: "-5px 5px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
                <Box>
                  <center>
                    <h2>Total Pharmacy Found: {fetchpharmacylists?.count}</h2>
                  </center>
                  <Box sx={{ border: "12px solid blue", height: "300px", overflow: "auto", backgroundColor: "#66C7EF" }}>
                    {fetchpharmacylists?.docs?.map(
                      (item: PharmacyListsInterface, key: number) => (
                        <>
                          <Card
                            sx={{ border: "2px solid red", width: "90%", margin: "10px 10px", padding: "20px" }}
                            key={key}
                          >

                            <Box>
                              <img
                                src={
                                  item?.branch_logo ||
                                  "https://w7.pngwing.com/pngs/791/121/png-transparent-health-care-medicine-physician-patient-contract-research-organization-infirm-text-hospital-surgery.png"
                                }
                                alt="UseerImage"
                                style={{ width: "30px", height: "40px", borderRadius: "50%" }}
                              />
                              <Box>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  style={{ fontFamily: "Times" }}
                                >
                                  {item?.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  gutterBottom

                                  style={{ fontFamily: "Times" }}
                                >
                                  {item?.address}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  gutterBottom

                                  style={{ fontFamily: "Times" }}
                                >
                                  {item?.city}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  gutterBottom>
                                  {item?.dispensingFee}
                                </Typography>
                              </Box>
                            </Box>
                            <Button variant="contained" onClick={() => handleClickOpen(key)}>
                              Branch Details
                            </Button>
                          </Card>

                        </>)
                    )}
                    <Dialog open={open} onClose={handleClose}>


                      {DialogContentData}

                    </Dialog>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Box sx={{ position: "relative" }}>
                <MapContainer
                  id="fullmap"
                  style={{
                    height: "500px",
                    width: "100%",
                    float: "right",
                    marginTop: "0px",
                  }}
                  center={[51.8755, -0.372755]}
                  zoom={7}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1"></a>'
                    url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1"
                  />
                  <MapEventsWrapper />
                  {fetchpharmacylists?.docs?.map(
                    (item: PharmacyListsInterface, mapkey: number) => (
                      <Button onClick={() => handleClickOpen(mapkey)}>
                        <Marker
                          key={mapkey}
                          position={[item?.latitude, item?.longitude]}
                          icon={myIcon}
                        // eventHandlers={{
                        //   click: () => handleClickOpen(mapkey),
                        // }}
                        >

                          <Popup>
                            <Typography>Email: {item?.email}</Typography>
                            <Typography>Phone: {item?.phone}</Typography>
                            <Typography>Address: {item?.address}</Typography>
                            <Typography>Status: {item?.status}</Typography>
                            {
                              fetchpharmacylists?.docs?.pharmacyBranchWorkingDay?.map((item: any) => {

                                return <>
                                  <Typography>Day : {item?.dayOfWeek} </Typography>
                                  {
                                    item?.pharmacyBranchWorkingHour?.map((hour: any) => {
                                      console.log(hour);
                                      
                                      return (
                                        <>
                                          <Typography>Time: from {hour?.openAt}  to {hour?.closeAt}</Typography>
                                        </>
                                      )
                                    })
                                  }

                                </>
                              })
                            }
                            Latitute:{item?.latitude}, Longditute:
                            {item?.longitude}

                          </Popup>

                        </Marker>
                      </Button>
                    )
                  )}
                </MapContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default mapfatching;






