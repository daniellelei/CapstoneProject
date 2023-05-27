import React, {useState, useEffect} from 'react';
import * as commentActions from '../../store/comment'
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

