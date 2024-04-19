import { Container, Grid, Typography } from "@mui/material"

function Pane3() {
    return (
        <Container
            maxWidth={false}
            sx={{
                width: '100%', height: '100%',
                backgroundColor: "#555",
                color: '#fff',
                backgroundSize: 'cover',
                backgroundImage: `url('https://cdn.pixabay.com/photo/2012/02/27/17/08/abstract-17573_960_720.jpg')`
            }}>
            <Grid sx={{ paddingTop: { xs: '10vh', sm: '30vh' } }}>
                <Grid container spacing={{ xs: 4, sm: 4 }} padding={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5">Built-For-You Agency Development</Typography>
                        From the back of a napkin to the app store. If you dream it, we'll build it.
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5">
                            Out-Of-The-Box Dev Team Support
                        </Typography>
                        Teams of elite developers ready to work from all over the world. Works out of the box!
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5">
                            Custom Small-Scale Staffing
                        </Typography>
                        Specialist and all-rounder developers where you need them, when you need them.
                    </Grid>
                </Grid></Grid>
        </Container>
    )
}

export default Pane3