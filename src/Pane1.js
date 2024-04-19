import { Box, Grid, Typography } from "@mui/material"

import RocketLaunch from '@mui/icons-material/RocketLaunch';

function Pane1() {
    return (

        <Box>

            <Grid container>

                <Grid sx={{ height: '20vh', padding: 4, bgcolor: 'white', display: 'flex', alignItems: 'center' }}>
                    <RocketLaunch />
                    <Typography variant="h2">Kunai</Typography>
                </Grid>


                <Grid container sx={{ height: '80vh', display: 'flex', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center bottom', backgroundRepeat: 'no-repeat', backgroundImage: `url('https://cdn.sanity.io/images/f9g2uuqu/production/8ea2d1bf419b3781a608fcaee2abb04c61172cf8-4678x3648.jpg?rect=1,0,4677,3648&w=3440&h=2683&auto=format')` }}>


                    <Grid item xs={12} sm={6} sx={{ padding: 5, bgcolor: 'rgba(255, 74, 74, 0.8)', color: '#fff' }}>
                        <Typography variant="h4">Kunai Takes You From Ideation To Creation, Faster</Typography>

                        <Typography variant="body1">Launch digital products, build systems, and optimize processes with custom solutions from the top 3% global developers.</Typography>

                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                    </Grid>
                </Grid>



            </Grid>


        </Box>
    )
}

export default Pane1