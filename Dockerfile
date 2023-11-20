FROM node:20 as client
WORKDIR /src/
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production
COPY ./client/ ./
RUN yarn build

FROM ruby:3.2.2 as server
EXPOSE 8000
WORKDIR /app/
ENV RAILS_ENV=production
COPY ./server/Gemfile ./server/Gemfile.lock ./
RUN bundle install
COPY ./server/ ./
RUN rails db:create && rails db:migrate && rails db:seed
COPY --from=client /src/dist/ ./public/
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "8000", "-e", "production"]
