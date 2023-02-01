import { FunctionComponent } from "react";
import { Card, CardMedia, Avatar, CardContent, Typography } from "@mui/material";

interface IContactCardProps {
  id: string;
  name: string;
  avatar: string;
  hoverable?: boolean
}

const ContactCard: FunctionComponent<IContactCardProps> = (
  ({
    id,
    name,
    avatar,
    hoverable = false
  }) => (
      <Card
        data-testid={id}
        raised={true}
        sx={{
          padding: '20px 10px 5px',
          margin: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ...(hoverable && {
            transition: 'transform 0.15s ease-in-out',
            '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' }
          })
        }}
      >
        <CardMedia>
          <Avatar
            alt={`${name} contact image`}
            src={avatar}
            sx={{
              height: '125px',
              width: '125px',
              objectFit: 'cover'
            }}
          />
        </CardMedia>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography>{name}</Typography>
        </CardContent>
      </Card>
    )
);

export default ContactCard;