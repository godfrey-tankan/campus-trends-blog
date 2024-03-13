type User = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  };
  
  enum UserRole {
    ADMIN = "admin",
    MODERATOR = "moderator",
    CLIENT = "client",
    USER = "user",
  }
  
  function login(email: string, password: string): User | null {
    const name = "";
    const user: User = {
      id: 1,
      name:name,
      email: '',
      role: UserRole.ADMIN,
    };
  
    return user;
  }
  
  const email = '';
  const password = '';
  
  const loggedInUser = login(email, password);
  
  if (loggedInUser) {
    console.log("User ID:", loggedInUser.id);
    console.log("User Name:", loggedInUser.name);
    console.log("User Email:", loggedInUser.email);
    console.log("User Role:", loggedInUser.role);
  }