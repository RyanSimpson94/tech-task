import { FunctionComponent, useState, ChangeEvent, useEffect } from "react";
import { Avatar, TextField, Grid } from "@mui/material";
import { IContact } from "@/models/IContact";

interface IContactProps {
  contact: IContact;
  isEditing?: boolean,
  onUpdateContact: (contact: IContact) => void
}

const Contact: FunctionComponent<IContactProps> = (
  ({
    contact,
    isEditing = false,
    onUpdateContact
  }) => {
    const [editedContact, setEditedContact] = useState<IContact>(contact);

    useEffect(() => {
      if (!isEditing) {
        return;
      }

      onUpdateContact(editedContact);
    }, [editedContact.name, editedContact.email, editedContact.phone, editedContact.birthday]);

    const onUpdateName = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.toLowerCase() === editedContact.name.toLowerCase()) {
        return;
      }

      setEditedContact((prevState) => ({
        ...prevState,
        name: e.target.value
      }));
    }

    const onUpdateEmail = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.toLowerCase() === editedContact.email.toLowerCase()) {
        return;
      }

      setEditedContact((prevState) => ({
        ...prevState,
        email: e.target.value
      }));
    }

    const onUpdatePhone = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.toLowerCase() === editedContact.phone.toLowerCase()) {
        return;
      }

      setEditedContact((prevState) => ({
        ...prevState,
        phone: e.target.value
      }));
    }

    const onUpdateBirthday = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.toLowerCase() === editedContact.birthday.toLowerCase()) {
        return;
      }

      // Check if valid date
      const newBirthday = new Date(e.target.value);
      if (newBirthday instanceof Date && !isNaN(newBirthday.getTime())) {
        setEditedContact((prevState) => ({
          ...prevState,
          birthday: e.target.value
        }));
      }
    }

    return (
      <Grid container>
        <Grid container item xs={6}>
          <Avatar
            alt={`${editedContact.name} contact image`}
            src={contact.avatar}
            variant="square"
            sx={{
              height: '350px',
              width: '350px'
            }}
          />
        </Grid>
        <Grid
          container
          item
          xs={6}
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Grid item xs={6}>
            <TextField data-testid="name-input" label="Name" variant="filled" value={editedContact.name} onChange={onUpdateName} inputProps={{ readOnly: !isEditing }} />
          </Grid>
          <Grid item xs={6}>
            <TextField data-testid="email-input" label="Email" variant="filled" value={editedContact.email} onChange={onUpdateEmail} inputProps={{ readOnly: !isEditing }} />
          </Grid>
          <Grid item xs={6}>
            <TextField data-testid="phone-input" label="Phone" variant="filled" value={editedContact.phone} onChange={onUpdatePhone} inputProps={{ readOnly: !isEditing }} />
          </Grid>
          <Grid item xs={6}>
            <TextField data-testid="birthday-input" label="Date of Birth" variant="filled" value={editedContact.birthday} onChange={onUpdateBirthday} inputProps={{ readOnly: !isEditing }} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
);

export default Contact;