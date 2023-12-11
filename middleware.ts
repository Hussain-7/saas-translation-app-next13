import { withAuth } from "next-auth/middleware";

export default withAuth;

// If we go on any of this route auth middle ware will trigger and check if user is logged in or not
export const config = {
  matcher: ["/chat", "/chat/:id*", "/register"],
};
