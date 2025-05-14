const axios = require('axios');
const User = require('./models/db'); // Adjust the path to your User model

async function updateLeetCodeStats() {
  try {
      const users = await User.find();

      if (users.length === 0) {
          console.log('No users found.');
          return;
      }

      const today = new Date();
      
      for (const user of users) {
          console.log(`Fetching LeetCode data for ${user.leetcodeId}...`);

          const query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }`;

          const response = await axios.post('https://leetcode.com/graphql/', {
              query,
              variables: { username: user.leetcodeId }
          });

          if (response.data.errors || !response.data.data.matchedUser) {
              console.error(`Error fetching data for ${user.leetcodeId}`);
              continue;
          }

          const userData = response.data.data.matchedUser;
          const easySolved = userData.submitStats.acSubmissionNum.find(stat => stat.difficulty === 'Easy')?.count || 0;
          const mediumSolved = userData.submitStats.acSubmissionNum.find(stat => stat.difficulty === 'Medium')?.count || 0;
          const hardSolved = userData.submitStats.acSubmissionNum.find(stat => stat.difficulty === 'Hard')?.count || 0;
          const totalSolved = easySolved + mediumSolved + hardSolved;

          // Initialize totalSolvedStartOfWeek if it's not set
          if (!user.totalSolvedStartOfWeek) {
              user.totalSolvedStartOfWeek = totalSolved;
          }

          // Weekly calculation
          if (today.getDay()==0) {
              // Update last weeks and current week values
              user.lastToLastWeek = user.lastWeek;
              user.lastWeek = user.thisWeek;
              user.thisWeek = totalSolved - user.totalSolvedStartOfWeek;
              user.totalSolvedStartOfWeek = totalSolved; // Update to current week's total solved
          } else {
              user.thisWeek = totalSolved - user.totalSolvedStartOfWeek;
          }

          // Update fields
          user.easySolved = easySolved;
          user.mediumSolved = mediumSolved;
          user.hardSolved = hardSolved;
          user.totalSolved = totalSolved;
          user.lastUpdated = new Date();

          await user.save();
          console.log(`User ${user.leetcodeId} updated successfully.`);
      }

      console.log('All users have been updated with weekly stats.');
  } catch (error) {
      console.error('Error updating LeetCode stats:', error);
  }
}


module.exports = updateLeetCodeStats;
