import React, { useContext } from "react";
import { AvailableUser, AvailableUserWrapper } from "../../ui/AvailableUser";
import { AuthContext } from "../auth/AuthProvider";

interface AvailableUserControllerProps {
  children?: React.ReactNode;
}

export const Page: React.FC<{}> = ({}) => {
  // call api to query random user available
  // const {data, isLoading} = useQuery()
  const data = [
    {
      username: "@phuonguyen88",
      fullname: "Phuong Uyen",
      profilePicture:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX92JsVX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-1UJOhdgyEAJyxyihV1mjBWenqOGNGfj5tViXEG-qUg&oe=6448F5A7",
      id: 1,
    },
    {
      username: "@phuonguyen88",
      fullname: "Phuong Uyen",
      profilePicture:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX92JsVX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-1UJOhdgyEAJyxyihV1mjBWenqOGNGfj5tViXEG-qUg&oe=6448F5A7",
      id: 2,
    },
    {
      username: "@phuonguyen88",
      fullname: "Phuong Uyen",
      profilePicture:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX92JsVX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-1UJOhdgyEAJyxyihV1mjBWenqOGNGfj5tViXEG-qUg&oe=6448F5A7",
      id: 3,
    },
    {
      username: "@phuonguyen88",
      fullname: "Phuong Uyen",
      profilePicture:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX92JsVX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-1UJOhdgyEAJyxyihV1mjBWenqOGNGfj5tViXEG-qUg&oe=6448F5A7",
      id: 4,
    },
    {
      username: "@phuonguyen88",
      fullname: "Phuong Uyen",
      profilePicture:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX92JsVX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-1UJOhdgyEAJyxyihV1mjBWenqOGNGfj5tViXEG-qUg&oe=6448F5A7",
      id: 5,
    },
    {
      username: "@phuonguyen88",
      fullname: "Phuong Uyen",
      profilePicture:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX92JsVX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-1UJOhdgyEAJyxyihV1mjBWenqOGNGfj5tViXEG-qUg&oe=6448F5A7",
      id: 6,
    },
    {
      username: "@phuonguyen88",
      fullname: "Phuong Uyen",
      profilePicture:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX92JsVX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-1UJOhdgyEAJyxyihV1mjBWenqOGNGfj5tViXEG-qUg&oe=6448F5A7",
      id: 7,
    },
    {
      username: "@phuonguyen88",
      fullname: "Phuong Uyen",
      profilePicture:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX92JsVX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-1UJOhdgyEAJyxyihV1mjBWenqOGNGfj5tViXEG-qUg&oe=6448F5A7",
      id: 8,
    },
  ];

  return (
    <React.Fragment>
      {data.map((user: any) => (
        <AvailableUser {...user} key={user.id} />
      ))}
    </React.Fragment>
  );
};

export const AvailableUserController: React.FC<
  AvailableUserControllerProps
> = ({}) => {
  const { conn } = useContext(AuthContext);

  if (!conn) {
    return null;
  }
  return (
    <AvailableUserWrapper>
      <Page />
    </AvailableUserWrapper>
  );
};
