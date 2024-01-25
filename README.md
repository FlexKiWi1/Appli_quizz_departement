# Geo quiz application

Mobile app to learn country departments and much more!

## Table of contents

1. [Setup](#setup)
2. [Add content](#add-content)
    1. [Create new module](#create-new-module)
    2. [Quizzes](#quizzes)
    3. [Maps](#maps)
3. [Credits](#credits)
4. [Contributors](#contributors)

## Setup

Install dependencies

```shell
npm install
```

Launch the app

- with expo app (download the app in the play store)

```shell
npx expo start
```

- with android (SDK)

```shell
npm run android
```

## Add content

### Create new module

Module represent a country or region of the world.

1. In `data/modules/` duplicate the `template` directory and rename it to the name of the contry/region.

2. Then rename the `main.ts` to the name of the contry/region.

3. Now you can add your module to the `list.ts` file in `data/modules`.

4. Update your module's name in the export of your module.

5. Create your [quizzes](#quizzes) and your [map](#maps).

### Quizzes

You can edit and add quizzes that already exist in each module, in the `<module-name>.tsx`.

### Maps

Each modules are maps. The `Map.tsx` file contains a component that renders the map.
You can stock the map data in the `data` folder inside the module folder.

## Credits

- [Quiz Géo - France et Monde](https://play.google.com/store/apps/details?id=fr.ivaska.quiz_geo&hl=fr&gl=US)

## Contributors

<a href="https://github.com/FlexKiWi1/Appli_quizz_departement/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FlexKiWi1/Appli_quizz_departement" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
