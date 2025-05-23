const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
// Firebase Console → Project Settings → Service Accounts → Generate new private key.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = "sudoadmin@citywellness.in"; // Change admin email

admin
  .auth()
  .getUserByEmail(email)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log(`Custom admin claim set for ${email}`);
    process.exit(); // Exit after setting the claim
  })
  .catch((error) => {
    console.error("Error setting admin claim:", error);
    process.exit(1);
  });
