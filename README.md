
# <img src="https://cdn.discordapp.com/attachments/965713099443281946/982113554624827442/logo2.png" width="100"/> Origin Music

A music sharing app built for CS35L Spring 2022.
This app boasts the ability for users to share their songs with the world.
Users can upload their songs to our database through our incredible website. Then they can explore
what other creators have to offer with our advanced search. Users can search by song, author name, and even
by uploading a music file. They also have the ability to like songs, add songs to their playlist, and even comment on songs.
The music is streamed right from the database in small chunks, meaning that there is minimal buffering
when clicking play.

## Docker Compose

This app uses docker compose to setup the database, backend, and frontend while ensuring
that they can be run on any platform that supports docker, and will be built with the
correct dependecies.

### Windows and macOS

Docker Compose is included in
[Docker Desktop](https://www.docker.com/products/docker-desktop)
for Windows and macOS.

### Linux

You can download Docker Compose binaries from the
[release page](https://github.com/docker/compose/releases) on this repository.

Rename the relevant binary for your OS to `docker-compose` and copy it to `$HOME/.docker/cli-plugins`

Or copy it into one of these folders for installing it system-wide:

* `/usr/local/lib/docker/cli-plugins` OR `/usr/local/libexec/docker/cli-plugins`
* `/usr/lib/docker/cli-plugins` OR `/usr/libexec/docker/cli-plugins`

(might require to make the downloaded file executable with `chmod +x`)


# Demo
Please ensure that you have installed docker.

You can find the 7zip database folder here
`https://drive.google.com/file/d/1_3ZafzrfjwUnkJ0ttidBf6lLdQuJi487/view?usp=sharing`

Unzip and copy the database into the docker volume path for your machine.
#### Windows Docker Volume Path
`\\wsl$\docker-desktop-data\version-pack-data\community\docker\volumes\`
![alt text](https://cdn.discordapp.com/attachments/965713099443281946/982112687834144768/unknown.png)
#### Linux Docker Volume Path
`/var/lib/docker/volume`

Then, within the top level of the project folder (in the same directory as `docker-compose.yml`)
run the command `docker-compose up --build`.

This will use docker to spin up the mongo database, node backend, and react frontend within
a single container. This may take a few minutes as all the packages are brought in and the images
built.

Finally, you will see the output from each service to the console.
Navigate to `http://localhost:3000/` to find the website.
The following accounts have already been setup:\
`rod@gmail.com password`\
`gamer@gmail.com password`\
`mega@gmail.com password1`\
`test@gmail.com password`

### Login
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425254259470356/2022-06-03_15-44-09.gif" width="600"/>

### Library
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425253714227270/2022-06-03_15-44-09_2.gif" width="600"/>

#### Upload Song
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425254490148884/2022-06-03_15-44-09_1.gif" width="600"/>

#### User Profile
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425255178035231/2022-06-03_15-44-09_6.gif" width="600"/>

### Text Search
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425253433188432/2022-06-03_15-44-09_4.gif" width="600"/>

### Audio Search
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425253986844712/2022-06-03_15-44-09_3.gif" width="600"/>

#### Music Player
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425255958155364/2022-06-03_15-44-09_5.gif" width="600"/>

#### Following Artist
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425254754414652/2022-06-03_15-44-09_8.gif" width="600"/>

#### Liking Song
<img src="https://cdn.discordapp.com/attachments/965713099443281946/982425255702298674/2022-06-03_15-44-09_7.gif" width="600"/>
