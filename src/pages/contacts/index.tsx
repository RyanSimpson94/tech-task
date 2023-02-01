import styles from '@/styles/Home.module.css'
import { GetStaticProps, NextPage } from 'next'
import ContactCard from '@/components/contact-card/ContactCard';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { getContacts } from '@/services/contact-service';
import { IContact } from '@/models/IContact';

export const getStaticProps: GetStaticProps = async () => {
  const contacts = await getContacts();

  return {
    props: {
      contacts
    },
    revalidate: 30 //Refresh data every 30 seconds.
  }
}

const Contacts: NextPage<{ contacts: IContact[] }> = ({ contacts }) => {
  return (
    <main className={styles.main}>
      <Grid
        container
        spacing={2}
      >
        {
          contacts.map(
            ({ id, name, avatar }) => (
              <Grid
                key={id}
                item
                xs={4}
              >
                <Link
                  key={id}
                  href={`contacts/${id}`}
                >
                  <ContactCard
                    name={name}
                    avatar={avatar}
                    hoverable
                  />
                </Link>
              </Grid>
            )
          )
        }

      </Grid>

    </main>
  )
}

export default Contacts;
