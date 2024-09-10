import { UserGoalCategory } from "../models/UserGoalCategory.js";
import db from "../configs/db.js";

const goalCategories = [
    { name: "Finance" },
    { name: "Entertainment" },
    { name: "Education" },
    { name: "Fitness and Nutrition" },
    { name: "Entrepreneurship" },
    { name: "Lifestyle" },
    { name: "Relationship and Marriage" },
    { name: "Properties and Ownership" },
    { name: "Business and Entrepreneurship" },
    { name: "Socialization" },
    { name: "Personal development" },
    { name: "Family" },
    { name: "Spiritual" },
    { name: "Health" }
];

const createUserGoalCategory = async () => {
    try {
        // Connect to the database
        await db.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync the model (this creates the table if it doesn't exist)
        await UserGoalCategory.sync();

        // Insert each category if it doesn't already exist
        for (const { name } of goalCategories) {
            const [category, created] = await UserGoalCategory.findOrCreate({
                where: { name }
            });

            if (created) {
                console.log(`Inserted category: ${name}`);
            } else {
                console.log(`Category already exists: ${name}`);
            }
        }

        console.log('Goal categories have been inserted/verified successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        // Close the connection
        await db.close();
    }
};

// Run the script
createUserGoalCategory();
