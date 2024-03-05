//
import React from "react";
import react, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Grid,
} from "@mui/material";

const AddOrg = () => {
  const [orgName, setOrgName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [lossType, setLossType] = useState([]);
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const submit = (event) => {
    event.preventDefault();
    const NewOrg = {};
    dispatch({
      type: "CREATE_ORGANIZATION",
      payload: NewOrg,
    });
  };
    /*
    dispatch({
        type: 'CREATE_ORG',
        payload: {
            organizationDetails: {
                org: {
                    name,
                    serviceExplanation,
                    // logo,        <<<< this will implement later
                    mission,
                    notes,
                    url,
                    phone,
                    email,
                    forProfit,
                    faithBased,
                    hasRetreatCenter,
                    linkedInUrl,
                    facebookUrl,
                    instagramUrl
                },
                address: {
                    addressLineOne,
                    addressLineTwo,
                    city,
                    state,
                    stateAbbreviation,
                    zipCode 
                },
                lossTypes: [
                    lossType1,
                    lossType2,
                    ...
                ],
                serviceTypes: [
                    serviceType1,
                    serviceType2,
                    ...
                ],
                contacts: [
                    contact1,
                    contact2,
                    ...
                ]
            }
        }
    })

<-------- BELOW IS FORMAT FOR A ORG CONTACT IN DISPATCH --------->

        contact1 = {
            firstName,
            lastName,
            phone,
            email,
            title
        }

<-------- ABOVE IS FORMAT FOR A ORG CONTACT IN DISPATCH --------->
    */
    

  return (
    <form className="add_org">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="name"
            label="Organisation Name"
            fullWidth
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="phone"
            label="Phone"
            type="tel"
            fullWidth
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="street"
            label="Street Address"
            fullWidth
            value={streetAddress}
            onChange={(event) => setStreetAddress(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="city"
            label="City"
            fullWidth
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="state"
            label="State"
            fullWidth
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="zip"
            label="Zip"
            fullWidth
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="country"
            label="Country"
            fullWidth
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Type of Loss:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="earlyPregnancy"
                    name="loss_type[]"
                    value="Early Pregnancy"
                    checked={lossType.includes("Early Pregnancy")}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setLossType([...lossType, "Early Pregnancy"]);
                      } else {
                        setLossType(
                          lossType.filter((type) => type !== "Early Pregnancy")
                        );
                      }
                    }}
                  />
                }
                label="Early Pregnancy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="stillbirth"
                    name="loss_type[]"
                    value="Stillbirth"
                    checked={lossType.includes("Stillbirth")}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setLossType([...lossType, "Stillbirth"]);
                      } else {
                        setLossType(
                          lossType.filter((type) => type !== "Stillbirth")
                        );
                      }
                    }}
                  />
                }
                label="Stillbirth"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Infant/Toddler Loss (0-3)"
                    name="loss_type[]"
                    value="Infant/Toddler Loss (0-3)"
                    checked={lossType.includes("Infant/Toddler Loss (0-3)")}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setLossType([...lossType, "Infant/Toddler Loss (0-3)"]);
                      } else {
                        setLossType(
                          lossType.filter(
                            (type) => type !== "Infant/Toddler Loss (0-3)"
                          )
                        );
                      }
                    }}
                  />
                }
                label="Infant/Toddler Loss (0-3)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Child Loss"
                    name="loss_type[]"
                    value="Child Loss"
                    checked={lossType.includes("Child Loss")}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setLossType([...lossType, "Child Loss"]);
                      } else {
                        setLossType(
                          lossType.filter((type) => type !== "Child Loss")
                        );
                      }
                    }}
                  />
                }
                label="Child Loss"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Childhood Cancer/Medical Complex"
                    name="loss_type[]"
                    value="Childhood Cancer/Medical Complex"
                  />
                }
                label="Childhood Cancer/Medical Complex"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Youth Loss (12-18)"
                    name="loss_type[]"
                    value="Youth Loss (12-18)"
                  />
                }
                label="Youth Loss (12-18)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Suicide & Substance Abuse"
                    name="loss_type[]"
                    value="Suicide & Substance Abuse"
                  />
                }
                label="Suicide & Substance Abuse"
              />
              <FormControlLabel
                control={
                  <Checkbox id="Homicide" name="loss_type[]" value="Homicide" />
                }
                label="Homicide"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Ambigous Loss / Missing Child"
                    name="loss_type[]"
                    value="Ambigous Loss / Missing Child"
                  />
                }
                label="Ambigous Loss / Missing Child"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Youth Grief"
                    name="loss_type[]"
                    value="Youth Grief"
                  />
                }
                label="Youth Grief"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Bereaved Mothers"
                    name="loss_type[]"
                    value="Bereaved Mothers"
                  />
                }
                label="Bereaved Mothers"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="BIPOC / Multi-Lingual"
                    name="loss_type[]"
                    value="BIPOC / Multi-Lingual"
                  />
                }
                label="BIPOC / Multi-Lingual"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Services:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="counseling"
                    name="services[]"
                    value="Counseling"
                  />
                }
                label="Counseling"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="supportGroups, Spiritual Needs"
                    name="services[]"
                    value="Support Groups,Spiritual Needs"
                  />
                }
                label="Support Groups, Spiritual Needs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Grief counceling, support groups, camps"
                    name="services[]"
                    value="Grief counceling, support groups, camps"
                  />
                }
                label="Grief Counceling, Support Groups, Camps"
              />
              <FormControlLabel
                control={
                  <Checkbox id="Retreats" name="services[]" value="Retreats" />
                }
                label="Retreats"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Women Retreats"
                    name="services[]"
                    value="Women Retreats"
                  />
                }
                label="Women Retreats"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Personal Sessions, Retreats"
                    name="services[]"
                    value="Personal Sessions, Retreats"
                  />
                }
                label="Personal Sessions, Retreats"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Support Groups And Counceling"
                    name="services[]"
                    value="Support Groups And Counceling"
                  />
                }
                label="Support Groups And Counceling"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Support Groups"
                    name="services[]"
                    value="Support Groups"
                  />
                }
                label="Support Groups"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="Grief Support"
                    name="services[]"
                    value="Grief Support"
                  />
                }
                label="Grief Support"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

export default AddOrg;
