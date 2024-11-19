import { configureStore } from "@reduxjs/toolkit";
import newsReducer from './newsSlice'
import activeNewsReducer from './activeNewsSlice'


export default configureStore({
    reducer: {
        news: newsReducer,
        activeNews: activeNewsReducer
    }
})