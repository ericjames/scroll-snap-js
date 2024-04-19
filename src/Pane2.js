import { Container, Grid, Typography } from "@mui/material"

import WavingHandIcon from '@mui/icons-material/WavingHand';

function Pane2() {
    return (
        <Container
            maxWidth={false}
            style={{
                backgroundSize: 'cover',
                height: '100%',
                backgroundImage: `url('https://files.123freevectors.com/wp-content/original/131382-abstract-grey-and-white-polygon-pattern-background-illustration.jpg')`
            }}>
            <Grid container sx={{ alignItems: 'center', padding: { xs: 4, sm: 8 }, paddingTop: { xs: '15vh', sm: '30vh' } }}>
                <Grid item sm={8} sx={{ bgcolor: '#faf7f3', padding: 4, borderRadius: 4 }}>
                    <Typography variant="h5" sx={{ fontSize: { xs: '1.3em', sm: '1.7em' } }}>Kunai collaborated closely with our engineers from start to finish, making the process smooth from inception through handoff. With their help, our development project exceeded an ambitious set of expectations.</Typography>
                </Grid>
                <Grid item sm={4} sx={{ padding: 2 }}>
                    <Typography variant="h6">Julio Santos</Typography> <br /><br />
                    DIRECTOR OF ENGINEERING
                </Grid>
            </Grid></Container>
    )
}

export default Pane2