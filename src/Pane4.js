import { Button, Container, Grid, Typography } from "@mui/material"

function Pane4() {
    return (

        <Container
            maxWidth={false}
            sx={{
                backgroundSize: 'cover',
                backgroundImage: `url('https://e0.pxfuel.com/wallpapers/174/519/desktop-wallpaper-black-and-white-abstract-minimal-black-futuristic.jpg')`,
                backgroundColor: "#333", color: "#fff", height: '100%'
            }}>
            <Grid sx={{ paddingTop: { xs: '10vh', sm: '20vh' }, textAlign: 'center' }}>
                <Typography variant="h4" paddingTop="30vh" >
                    Ready to launch your next fintech project with a team of world class developers?</Typography>

                <Button variant="contained" color="primary" style={{ fontSize: 25, backgroundColor: 'rgba(255, 74, 74, 0.9)', marginTop: 20 }}>Contact Us</Button>
            </Grid>
        </Container>
    )

}
export default Pane4