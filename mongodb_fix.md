# Troubleshooting: Render "Authentication Failed"

If Render logs show `MongoServerSelectionError` or `AuthenticationFailed`, it is usually one of two things:

## 1. Network Access (Most Likely)
Render servers use dynamic IP addresses. You must allow **all** IP addresses in MongoDB Atlas.

1. Go to **[MongoDB Atlas](https://cloud.mongodb.com/)**.
2. Click **Network Access** in the left sidebar.
3. Click **Add IP Address**.
4. Click **Allow Access From Anywhere** (or enter `0.0.0.0/0`).
5. Set Time to **1 Week** (or permanent) and click **Confirm**.
6. Wait 1-2 minutes for the status to become "Active".
7. **Redeploy** or **Restart** your service in Render.

## 2. Incorrect Password
If the password in your connection string has special characters (like `@`, `:`, `%`, `#`), they must be **URL Encoded**.

- **Bad**: `pa$$word`
- **Good**: `pa%24%24word`

**To verify:**
1. Go to **Database Access** in Atlas.
2. Edit your user and click **"Edit Password"**.
3. Change it to something simple (alphanumeric only) temporarily, e.g., `securepassword123`.
4. Update the `MONGODB_URI` environment variable in Render with the new password.
