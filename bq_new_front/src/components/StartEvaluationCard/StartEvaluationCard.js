import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Box
} from '@material-ui/core';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import CropFree from '@material-ui/icons/CropFree';
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  root: {},
  codeContainer: {
    margin: 20
  },
  gridInputCodeContainer: {
    marginBottom: 20
  },
  inputCode: {
    width: 270,
    height: 45,
    border: '1px solid #2c2b2b',
    background: '#FFFFFF',
    boxShadow: '1px 1px 1px #2c2b2b',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'OCR A Std, monospace'//'Miriam Libre, sans-serif'
  },
  buttonCode: {
    background: 'linear-gradient(to bottom, #2c2b2b 5%, #2c2b2b 100%)',
    display: 'inline-block',
    border: '1px solid #ffffff',
    backgroundColor: '#2c2b2b',
    padding: '6px 24px',
    borderRadius: '6px',
    color: '#ffffff',
    fontFamily: 'Miriam Libre, sans-serif',
    fontSize: 22,
    fontWeight: 'bold',
    textDecoration: 'none',
    textShadow: '0px 1px 0px #0a1c2e',
    boxShadow: 'inset 0px 1px 0px 0px #ffffff'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1),
    width: '100px'
  },
}));

const StartEvaluationCard = props => {
  const { className, product, ...rest } = props;
  const [codigo, setCodigo] = useState(0);

  const classes = useStyles();

  function loadAlert(icon, message) {
    Swal.fire({
      icon: icon,
      title: message
    });
  }

  const handleChange = (event) => {
    setCodigo(event.target.value);
  }

  const onClickButton = () => {
    if(codigo == 0){
      loadAlert('error', 'Informe o código da avaliação.');
    } else {
      loadAlert('success', 'A avaliação iniciará em instantes.');
    }
  }

  function onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}>
      <Box width="100%" height="100%" bgcolor="#3a7cf7">
      <CardContent>
          <div className={classes.codeContainer}>
              <Grid container
                    spacing={1}
                    justify="center"
                    className={classes.gridInputCodeContainer}>
                <Grid item>
                  <input
                      className={classes.inputCode}
                      type="text"
                      name="name"
                      placeholder="código?"
                       onKeyPress={onlynumber}
                      onChange={handleChange}/>

                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            <Grid container
                  spacing={1}
                  justify="center">
              <button
                  type="button"
                  className={classes.buttonCode}
                  onClick={onClickButton}>Participar!</button>
            </Grid>
          </div>
      </CardContent>
      </Box>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between">
          <Grid
            className={classes.statsItem}
            item>
            <Typography
                display="inline"
                variant="body2">
              Infome o código da avaliação.
            </Typography>
          </Grid>
          <Grid
              className={classes.statsItem}
              item>
            <QuestionAnswer className={classes.statsIcon} />
            <Typography
                display="inline"
                variant="body2">
              Aqui é o lugar certo para você ser questionado.
            </Typography>
          </Grid>

        </Grid>
      </CardActions>
    </Card>
  );
};

StartEvaluationCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default StartEvaluationCard;
