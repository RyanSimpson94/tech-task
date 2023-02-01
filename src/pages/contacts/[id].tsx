import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import Contact from '@/components/contact/Contact'
import { Paper, Box } from '@mui/material'
import { updateContact, deleteContact, getContact } from '@/services/contact-service'
import { IContact } from '@/models/IContact';



const ContactViewer: NextPage<{ contact: IContact }> = ({ contact }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newContact, setNewContact] = useState<IContact>(contact);

  const onEditingContact = () => {
    setIsEditing(true);
  }

  const onSaveContact = async () => {
    await updateContact(newContact);
    router.push('/contacts');
  }

  const onDeleteContact = async () => {
    const deleted = await deleteContact(contact.id);

    if (deleted) {
      router.push('/contacts');
    }
  }

  return (
    <main className={styles.main}>
      <Paper>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          borderBottom: '1px solid lightgrey'
        }}>
          {
            isEditing ?
              <Button variant="text" color="success" onClick={onSaveContact}>
                <SaveIcon />
              </Button>
              :
              <Button variant="text" onClick={onEditingContact}>
                <EditIcon />
              </Button>
          }
          <Button variant="text" color="error" onClick={onDeleteContact}>
            <DeleteForeverIcon />
          </Button>
        </Box>
        <Contact
          contact={contact}
          isEditing={isEditing}
          onUpdateContact={setNewContact}
        />
      </Paper>
    </main>
  )
}

ContactViewer.getInitialProps = async ({ query }) => {
  const { id } = query;

  if (!id) {
    return;
  }

  const contact = await getContact(id.toString());

  return {
    contact
  }
}

export default ContactViewer;