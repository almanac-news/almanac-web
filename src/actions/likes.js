// import { TOGGLE_LIKE } from 'constants/likes';
//
// export function toggleLike () {
//   return dispatch => {
//     dispatch({ type: TOGGLE_LIKE });
//   };
// }


// export function toggleLike (articleId, likeStatus) {
//   console.log('inside toggleLike');
//   return dispatch => {
//     if (likeStatus === 1) {
//       // /api/likes/:article
//       console.log('inside status 1');
//       return fetch('/api/like/' + articleId, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           vote: -1
//         })
//       })
//         .then( response => {
//           // check if data.value is 201, if it is, send relevant payload
//           return {
//             type: TOGGLE_LIKE,
//             articleId: articleId,
//             likeStatus: -1
//           };
//         })
//         .then( data => dispatch(data) );
//         // .catch( () => dispatch({ type: FETCH_NEWS_FAILED }) );
//     } else {
//       console.log('inside status -1');
//       return fetch('/api/like/' + articleId, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           vote: 1
//         })
//       })
//         .then( response => {
//           // check if data.value is 201, if it is, send relevant payload
//           return {
//             type: TOGGLE_LIKE,
//             articleId: articleId,
//             likeStatus: 1
//           };
//         })
//         .then( data => dispatch(data) );
//         // .catch( () => dispatch({ type: FETCH_NEWS_FAILED }) );
//     }
//   };
// }
