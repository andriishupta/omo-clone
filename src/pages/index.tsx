import Head from 'next/head';
import { Col, Container, Grid, Image, Row, Text, Spacer } from '@nextui-org/react';

export default function Home() {
  return (
    <>
      <Container sm>
        <Grid.Container gap={3}>
          <Grid xs={12} sm={6}>
            <Container display="flex" alignItems="center">
              <Row>
                <Col>
                  <Text h2>Omo, Your All-In-One Weight-Loss App</Text>
                  <Text>
                    Omo is a weight-loss app that streamlines the calorie counting process, making it easier than ever
                    to log your meals, track workouts, and see your first weight-loss results.
                  </Text>
                </Col>
              </Row>
            </Container>
          </Grid>
          <Grid xs={12} sm={6}>
            <Image width="65%" src="/omo-all-in-one.webp" alt="Omo all-in-one" />
          </Grid>

          <Grid xs={12} sm={6}>
            <Image width="65%" src="/omo-fasting.webp" alt="Omo Fasting" />
          </Grid>
          <Grid xs={12} sm={6}>
            <Container display="flex" alignItems="center">
              <Row>
                <Col>
                  <Text h2>Track Your Fasting & Eating Windows</Text>
                  <Text>
                    Is intermittent fasting a part of your weight-loss strategy? Keep your fasting and eating windows
                    under control using the fasting tracker. Choose your preferred fasting plan and get notifications
                    when you should start or stop your eating window.
                  </Text>
                </Col>
              </Row>
            </Container>
          </Grid>

          <Grid xs={12}>
            <Container display="flex" alignItems="center">
              <Row>
                <Col>
                  <Text h2>Counting Calories Has Never Been So Easy</Text>
                  <Text>
                    Counting your calories is easier than ever thanks to food recognition, a way of tracking food by
                    using your camera. You simply take a picture of your food’s barcode to find it in the database. When
                    you start using Omo, you also get your daily calorie goal calculated, which will help you track if
                    you’re in a calorie deficit and contribute to your weight-loss success over time.
                  </Text>
                </Col>
              </Row>
            </Container>
          </Grid>

          <Grid xs={12}>
            <Container display="flex" alignItems="center">
              <Row>
                <Col>
                  <Text h2>See the Difference Omo Makes in Your Life</Text>
                  <Text>
                    If you are looking for an easy-to-use weight loss app that combines all the essential aspects of
                    weight loss, including diet, fitness, and motivation, look no further than the Omo app. By simply
                    answering some questions about your current lifestyle, previous experience, and food choices, you
                    receive a weight-loss plan that includes calorie counts, meal plans, workout plans, and motivation
                    to stick to your goals. Give the Omo app a try and see how easy it is to build healthy habits that
                    stick and reach your weight goals by having everything you need within one app.
                  </Text>
                </Col>
              </Row>
            </Container>
          </Grid>

          <Grid xs={12}><Spacer y={2}/></Grid>
        </Grid.Container>
      </Container>
    </>
  );
}
