
Visit the deployed versions:
   - [Merchant App](https://paytm-project-merchant-app-eta.vercel.app/)
   - [User App](https://paytm-project-user-app-wallet.vercel.app/)

1. Clone the repository:

   ```bash
   git clone https://github.com/chinmayyyyyy/paytm-project.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run PostgreSQL either locally or on the cloud (e.g., [neon.tech](https://neon.tech/)):

   ```bash
   docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
   ```

4. Update `.env` files everywhere with the correct database URL.

5. Go to the `packages/db` directory and run:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

6. Start the User app:

   ```bash
   cd apps/user-app
   npm run dev
   ```

7. Try logging in using the following credentials (pre-seeded data):
   - Phone: **1111111111**
   - Password: **alice**
