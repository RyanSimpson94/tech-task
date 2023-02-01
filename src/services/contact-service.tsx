import { IContact } from "@/pages/contacts";

const baseUrl = `${process.env.NEXT_PUBLIC_CONTACTS_API_BASE_URL}/contacts`;

export async function getContacts(): Promise<IContact[]> {
  const res = await fetch(baseUrl);
  const contacts = await res.json();

  return contacts;
}


export async function getContact(id: string): Promise<IContact> {
  const res = await fetch(`${baseUrl}/${id}`);
  const contact = await res.json();

  return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
  const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });

  return res.ok;
}

export async function updateContact(contact: IContact): Promise<IContact> {
  const res = await fetch(`${baseUrl}/${contact.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  });

  const newContact = await res.json();

  return newContact;
}