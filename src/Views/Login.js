import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  default as React,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CommonButton from "../components/CommonButton";
import { CommonFloatingInput } from "../components/CommonFloatingInput";
import { screens } from "../constants/screens";
import { setMyProfile } from "../reducers/app.reducers";
import { COLORS } from "../theme/colors";
import { loginApp, validateToken } from "../utils/api";
import { AuthContext } from "../utils/AuthContext";
import Lottie from "lottie-react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";

const Login = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [loader, setLoader] = useState(false);

  const emailRef = React.useRef(new Animated.Value(0)).current;
  const passwordRef = React.useRef(new Animated.Value(0)).current;
  const animationRef = useRef();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const loginClickHandler = () => {
    Keyboard.dismiss();
    let emailError = "";
    let passwordError = "";
    if (email?.length == 0) {
      setEmailError("Please enter email address");
      emailError = "Please enter email address";
    }
    if (password?.length == 0) {
      setPasswordError("Please enter Password");
      passwordError = "Please enter Password";
    }

    if (emailError?.length === 0 && passwordError?.length === 0) {
      setLoader(true);
      let dataToSend = { username: email, password: password };
      loginApp(dataToSend)
        .then((res) => {
          getDetailsAndNavigate(res);
          setLoader(false);
          setEmail("");
          setPassword("");
          setEmailError("");
          setPasswordError("");
        })
        .catch((e) => {
          setLoader(false);
          let message = "";
          if (e.message.includes("404") || e.message.includes("403")) {
            message = "Invalid username or password";
            setInvalidCredential(true);
          } else {
            message = e.message;
          }
        });
    }
  };

  const getDetailsAndNavigate = (res) => {
    validateToken(res.token)
      .then((result) => {
        if (result.id) {
          signIn(res.token, res, result);
          dispatch(setMyProfile(res));
        }
      })
      .catch((err) => {});
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.mainView}>
          <Lottie
            ref={animationRef}
            source={require("../assets/JSON/login.json")}
            style={{ opacity: 0.5 }}
          />
          <View style={styles.spaceTop20}>
            <Text style={[styles.loginText]}>Login</Text>
          </View>
          <View style={styles.spaceTop16}>
            <View>
              <CommonFloatingInput
                labelText={"Email"}
                moveText={emailRef}
                inputStyle={{ color: COLORS.black, fontWeight: "600" }}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                  setInvalidCredential("");
                }}
                errorText={emailError}
                labelTextStyle={{ color: COLORS.gray500 }}
                placeholder={""}
              />
            </View>

            <View style={styles.spaceTop16}>
              <CommonFloatingInput
                labelText={"Password"}
                moveText={passwordRef}
                inputStyle={{ color: COLORS.black, fontWeight: "600" }}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                  setInvalidCredential("");
                }}
                showIcon
                secureTextEntry
                errorText={passwordError}
                labelTextStyle={{ color: COLORS.gray500 }}
                placeholder={""}
              />
            </View>
          </View>
          {invalidCredential ? (
            <TouchableOpacity onPress={() => {}} style={styles.spaceTop8}>
              <Text style={[styles.forgetPasswordReview]}>
                Review your email and password or{" "}
                <Text
                  onPress={() => {}}
                  style={[styles.forgetPasswordReviewColored]}
                >
                  Forgot Password?
                </Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {}} style={styles.spaceTop8}>
              <Text style={[styles.forgetPasswordText]} onPress={() => {}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.spacemargin24}>
            <ListItem
              Component={TouchableScale}
              onPress={() => {
                loginClickHandler();
              }}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                marginHorizontal: 16,
              }}
              containerStyle={{ backgroundColor: COLORS.one_01_coral }}
            >
              <ListItem.Content
                style={{ alignItems: "center", marginHorizontal: 16 }}
              >
                <ListItem.Title
                  style={{ color: COLORS.white, fontWeight: "bold" }}
                >
                  Login
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View>
          <View style={styles.createAccount}>
            <Text style={[styles.createAccountText]}>
              Don't have an account?{" "}
              <Text
                onPress={() => {
                  navigation.navigate(screens.SIGNUP);
                  setEmail("");
                  setPassword("");
                  setEmailError("");
                  setPasswordError("");
                }}
                style={{ color: COLORS.one_01_coral, fontWeight: "600" }}
              >
                Register here
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Login;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainContainer: {
    flexGrow: 1,
  },
  mainView: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
  spaceTop20: {
    marginTop: 20,
  },
  loginText: {
    color: COLORS.one_01_coral,
    fontSize: 20,
    fontWeight: "600",
  },
  spaceTop16: {
    marginTop: 16,
  },
  spaceTop8: {
    marginTop: 8,
  },
  forgetPasswordText: {
    lineHeight: 32,
    textDecorationLine: "underline",
  },
  forgetPasswordReview: {
    color: COLORS?.redEF374E,
    marginTop: 16,
  },
  forgetPasswordReviewColored: {
    color: COLORS.redEF374E,
    textDecorationLine: "underline",
    lineHeight: 16,
  },
  spacemargin24: {
    marginVertical: 24,
  },
  createAccount: {
    alignSelf: "center",
  },
  createAccountText: {
    textDecorationLine: "underline",
  },
});
