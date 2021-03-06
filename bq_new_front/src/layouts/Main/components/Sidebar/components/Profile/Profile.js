import React, {useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {Avatar, Grid, Link, Typography} from '@material-ui/core';
import {getInitials} from "../../../../../../helpers";
import {Link as RouterLink} from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles(theme => ({
    root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'fit-content'
    },
    avatar: {
    width: 60,
    height: 60
    },
    name: {
    marginTop: theme.spacing(1)
    },
    tour: {
        backgroundColor: '#5DE2A5',
        display: 'block',
        margin: '8px',
        padding: '0 4px',
        textAlign: 'center',
        color: '#fff',
        borderRadius: 4
    }
}));

const Profile = props => {
  const { className, openTour, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: localStorage.getItem("@Questione-name-user"),
    avatar: '/images/avatars/avatar_11.png',
    email: localStorage.getItem('@Questione-email-user'),
    level: localStorage.getItem('@Questione-acess-level-user')==="1"
        ? "Administrador" : localStorage.getItem('@Questione-acess-level-user')==="2"
           ? "Professor(a)" : "Usuário"
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}>
        <Avatar
            className={classes.avatar}
            src={user.avatar}>
            {getInitials(user.name)}
        </Avatar>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
          <Typography
            className={classes.name}
            variant="body2">
            {user.name}
          </Typography>
        </Grid>
      <Typography variant="body2">{user.email}</Typography>
      <Typography variant="body2">{user.level}</Typography>
      <Typography
          variant="body2">
        Atualize seu Perfil {' '}
        <Link
            component={RouterLink}
            to="/account"
            variant="body2" className="update-profile">
          clicando aqui.
        </Link>
      </Typography>
        { localStorage.getItem("@Questione-acess-level-user") != 1 ?
        <Chip
            className="tour-questione"
            size="small"
            label="Tour Questione"
            clickable
            variant="outlined"
            color="primary"
            onClick={openTour}
            onDelete={openTour}
            deleteIcon={<PlayCircleOutline />}
            style={{marginTop: '5px'}}
        /> : null }
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
    openTour: PropTypes.func,
};

export default Profile;
