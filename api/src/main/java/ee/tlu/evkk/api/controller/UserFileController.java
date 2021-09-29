package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.dto.UserFileResponseEntity;
import ee.tlu.evkk.api.dao.UserFileDao;
import ee.tlu.evkk.api.dao.dto.UserFileView;
import ee.tlu.evkk.api.exception.AbstractBusinessException;
import ee.tlu.evkk.api.security.AuthenticatedUser;
import ee.tlu.evkk.api.service.UserFileService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@RestController
@RequestMapping("/user/file")
public class UserFileController {

  private final UserFileService userFileService;
  private final UserFileDao userFileDao;

  public UserFileController(UserFileService userFileService, UserFileDao userFileDao) {
    this.userFileService = userFileService;
    this.userFileDao = userFileDao;
  }

  @GetMapping
  @Transactional(readOnly = true)
  public List<UserFileResponseEntity> listFiles(@AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
    List<UserFileView> userFileViews = userFileDao.findViewsByUserId(authenticatedUser.getUserId());
    return userFileViews.stream()
      .map(ApiMapper.INSTANCE::toUserFileResponseEntity)
      .collect(Collectors.toList());
  }

  @PostMapping
  @Transactional(rollbackFor = AbstractBusinessException.class)
  public Map<?, ?> postFile(@AuthenticationPrincipal AuthenticatedUser authenticatedUser, @RequestParam("file") MultipartFile[] files) throws AbstractBusinessException {
    userFileService.insert(authenticatedUser.getUserId(), files);
    return Collections.emptyMap();
  }

}
