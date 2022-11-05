import {NextPageWithLayout} from "src/pages/_app";
import {ReactNode, MouseEvent, useState} from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import Box from "@mui/material/Box";
import MuiCard, {CardProps} from "@mui/material/Card";
import {styled} from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  FormControl,
  FormHelperText, Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {useAuth} from "../../@core/hooks/useAuth";

const Card = styled(MuiCard)<CardProps>(({theme}) => ({
  [theme.breakpoints.up('sm')]: {
    width: '28rem',
  }
}))

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(5).required()
})

const LoginPage: NextPageWithLayout = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {control, setError, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const auth = useAuth()

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = async (data: any) => {
    const {username, password} = data
    console.log(username, password)
    await auth.login({username, password}).catch(errors => {
      setError('username', {type: 'manual', message: 'Invalid username or password'})
    })
  }

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Card>
        <CardContent>
          <Box>
            <Typography component="h3" variant="h4" sx={{mb: 4}}>Login</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{mb: 4}}>
                <Controller
                  name="username"
                  control={control}
                  render={({field: {value, onBlur, onChange}}) => (
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={!!errors?.username}
                    />
                  )}
                />
                {errors.username && <FormHelperText error>{errors.username.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{mb: 4}}>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: {value, onBlur, onChange}}) => {
                    return (
                      <OutlinedInput
                        id='auth-login-password'
                        type={showPassword ? 'text' : 'password'}
                        label='Password'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={handleMouseDownPassword}
                              aria-label='toggle password visibility'
                            >
                              <Icon sx={{
                                color: showPassword ? 'primary.main' : 'primary.light'
                              }}>
                                remove_red_eye
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )
                  }}
                />
                {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{mb: 7}}>
                Login
              </Button>
            </form>
          </Box>
        </CardContent>

      </Card>
    </Box>
  );
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true;

export default LoginPage;
