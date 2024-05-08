ByteMister3000
ByteMister3000 is a music player web application project developed primarily using vanilla JavaScript and Firebase as the backend service. The project allows users to upload music, listen to music, and interact with other users.
The website can be accessed via ByteMister3000.
https://bytemister3000.web.app
Language and Tools Used
Editor (e.g., VSCode)
JavaScript
HTML
CSS
Firestore
Functionalities
1. Authentication
Users can sign in and log in using email and password. Additionally, authentication is supported via Facebook, Twitter, and Google APIs.

2. Upload to Cloud Storage (Add Data)
Authenticated users can upload their music to ByteMister3000. Uploaded music is stored in the cloud using Firebase. The media URLs are then copied to Firestore.

3. Play Music (Fetch Data)
Both authenticated and unauthenticated users can play music. When music is being played, the associated ID fetches the song title, names of the artists, and the cover art.

4. Edit and Delete Data
Users can view the songs they have uploaded, edit certain fields, or delete the music if desired.

5. Collections
Music can be grouped into various collections based on the genre.

What's Next?
ByteMister3000 is a work in progress, and updates will be rolled out. Here are some upcoming improvements:

UI/UX restructuring to ensure mobile responsiveness.
User ability to create playlists and add music to playlists.
User interaction features such as commenting on uploaded music.
Stay tuned for these changes!
